'use client';

import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  Tabs, 
  Upload, 
  Input, 
  Table, 
  message, 
  Typography, 
  Space, 
  Alert,
  Tag,
  App
} from 'antd';
import { 
  Upload as UploadIcon, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Trash2,
  Copy
} from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { supabase } from '@/lib/supabase';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { TextArea } = Input;

const BulkUpload = () => {
  const { modal } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [tsvText, setTsvText] = useState('');
  const [activeTab, setActiveTab] = useState('1');

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    const extension = file.name.split('.').pop()?.toLowerCase();

    reader.onload = (e) => {
      const content = e.target?.result;
      if (!content) return;

      if (extension === 'csv') {
        Papa.parse(content as string, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
            message.success(`Parsed ${results.data.length} rows from CSV`);
          },
          error: (err: Error) => message.error(`CSV Error: ${err.message}`)
        });
      } else if (extension === 'xlsx' || extension === 'xls') {
        const workbook = XLSX.read(content, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
        message.success(`Parsed ${jsonData.length} rows from Excel`);
      }
    };

    if (extension === 'csv') {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
    return false; // Prevent auto-upload
  };

  const handleTsvParse = () => {
    if (!tsvText.trim()) {
      message.warning('Please paste some data first');
      return;
    }

    Papa.parse(tsvText, {
      delimiter: '\t',
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length === 0) {
          message.error('No valid data found. Ensure you copied the header row.');
          return;
        }
        setData(results.data);
        message.success(`Parsed ${results.data.length} rows from TSV`);
      },
      error: (err: any) => message.error(`TSV Error: ${err.message}`)
    });
  };

  const processImport = async () => {
    if (data.length === 0) return;

    setLoading(true);
    try {
      // Map and sanitize data
      const parseDate = (dateStr: string) => {
        if (!dateStr) return null;
        try {
          const d = new Date(dateStr);
          if (isNaN(d.getTime())) return null;
          return d.toISOString().split('T')[0];
        } catch {
          return null;
        }
      };

      const sanitizedData = data.map((item: Record<string, any>) => ({
        title: String(item.title || item['Scholarship Title'] || 'Untitled'),
        description: String(item.description || item['Description'] || ''),
        amount: String(item.amount || item['Scholarship Amount'] || ''),
        deadline: parseDate(String(item.deadline || item['Deadline'] || '')),
        state: String(item.state || item['Applicable State'] || 'All India'),
        category: String(item.category || item['Category'] || item['Category (Caste)'] || 'All'),
        gender_requirement: String(item.gender_requirement || item['Gender Requirement'] || 'All'),
        provider: String(item.provider || item['Provider / Organization'] || ''),
        official_link: String(item.official_link || item['Official Website Link'] || ''),
        is_verified: true,
        created_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('scholarships')
        .insert(sanitizedData);

      if (error) throw error;

      message.success(`Successfully imported ${sanitizedData.length} scholarships!`);
      setData([]);
      setTsvText('');
    } catch (err: any) {
      console.error('Import Error:', err);
      modal.error({
        title: 'Import Failed',
        content: `Error: ${err.message || 'Check your data format and try again.'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title', ellipsis: true, render: (t: any, r: any) => t || r['Scholarship Title'] },
    { title: 'State', dataIndex: 'state', key: 'state', render: (t: any, r: any) => t || r['Applicable State'] },
    { title: 'Deadline', dataIndex: 'deadline', key: 'deadline', render: (t: any, r: any) => t || r['Deadline'] },
    { title: 'Provider', dataIndex: 'provider', key: 'provider', ellipsis: true, render: (t: any, r: any) => t || r['Provider / Organization'] },
  ];

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-none shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Database size={24} />
          </div>
          <div>
            <Title level={4} className="!mb-0">Bulk Scholarship Importer</Title>
            <Text className="text-gray-500">Upload CSV/Excel or paste TSV data directly from your spreadsheet.</Text>
          </div>
        </div>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="bulk-tabs"
          items={[
            {
              key: '1',
              label: <span className="flex items-center"><UploadIcon size={16} className="mr-2" /> Upload File</span>,
              children: (
                <div className="py-4">
                  <Dragger
                    accept=".csv,.xlsx,.xls"
                    beforeUpload={handleFileUpload}
                    showUploadList={false}
                    className="bg-gray-50 rounded-2xl border-dashed border-2 border-gray-200 hover:border-primary/50 transition-all p-8"
                  >
                    <p className="ant-upload-drag-icon flex justify-center">
                      <FileText size={48} className="text-primary/40" />
                    </p>
                    <p className="ant-upload-text font-bold text-gray-700">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint text-gray-400 mt-2">
                      Support for CSV, XLSX. Ensure your file has a header row with matching column names.
                    </p>
                  </Dragger>
                </div>
              )
            },
            {
              key: '2',
              label: <span className="flex items-center"><Copy size={16} className="mr-2" /> Paste TSV Data</span>,
              children: (
                <div className="py-4 space-y-4">
                  <Alert 
                    message="How to use TSV Paste" 
                    description="Copy your rows (including header) from Excel or Google Sheets and paste them below. The data is usually tab-separated."
                    type="info"
                    showIcon
                    className="rounded-xl"
                  />
                  <TextArea
                    rows={8}
                    placeholder="Paste data here..."
                    value={tsvText}
                    onChange={(e) => setTsvText(e.target.value)}
                    className="rounded-xl font-mono text-sm"
                  />
                  <Button 
                    type="primary" 
                    icon={<FileText size={16} />} 
                    onClick={handleTsvParse}
                    className="bg-gray-800 h-10 rounded-lg px-6"
                  >
                    Parse Paste Data
                  </Button>
                </div>
              )
            }
          ]}
        />
      </Card>

      {data.length > 0 && (
        <Card 
          className="rounded-2xl border-none shadow-sm overflow-hidden"
          title={
            <div className="flex justify-between items-center w-full">
              <Space>
                <CheckCircle2 size={18} className="text-green-500" />
                <span>Preview Data ({data.length} rows)</span>
              </Space>
              <Button 
                danger 
                type="text" 
                icon={<Trash2 size={16} />} 
                onClick={() => setData([])}
              >
                Clear
              </Button>
            </div>
          }
        >
          <Table 
            dataSource={data} 
            columns={columns} 
            pagination={{ pageSize: 5 }}
            size="small"
            rowKey={(r, i) => i || 0}
          />
          <div className="mt-6 flex justify-end">
            <Button 
              type="primary" 
              size="large"
              icon={<Database size={18} />}
              loading={loading}
              onClick={processImport}
              className="bg-primary h-12 px-10 rounded-xl font-bold"
            >
              Start Bulk Import
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BulkUpload;
