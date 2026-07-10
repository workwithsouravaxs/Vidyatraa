'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, Upload, Button, List, Tag, message } from 'antd';
import { 
  FileText, 
  Upload as UploadIcon, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Info,
  ShieldCheck
} from 'lucide-react';



const DocumentCenter = () => {
  const [documents, setDocuments] = useState([
    { id: '1', name: 'Aadhaar_Card.pdf', type: 'Identity Proof', size: '1.2 MB', status: 'Verified', date: '2026-05-01' },
    { id: '2', name: 'Income_Certificate_2025.jpg', type: 'Income Proof', size: '850 KB', status: 'Pending', date: '2026-05-10' },
    { id: '3', name: 'Marksheet_12th.pdf', type: 'Academic Proof', size: '2.1 MB', status: 'Verified', date: '2026-04-20' },
  ]);

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    message.success('Document deleted successfully');
  };

  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Document Center</h1>
            <p className="text-gray-500">Securely manage and reuse your documents for multiple applications.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-primary bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
            <ShieldCheck size={20} />
            <span className="font-bold">End-to-End Encrypted</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card title="Upload New Document" className="rounded-2xl border-none shadow-sm mb-6">
              <Upload.Dragger {...uploadProps} className="rounded-2xl bg-gray-50 p-6 border-dashed">
                <div className="flex flex-col items-center">
                  <UploadIcon className="text-primary mb-4" size={40} />
                  <p className="font-bold text-gray-700">Click or drag file to upload</p>
                  <p className="text-xs text-gray-500 mt-2">Support for PDF, JPG, PNG (Max 5MB)</p>
                </div>
              </Upload.Dragger>
              
              <div className="mt-8">
                <h4 className="font-bold text-sm text-gray-700 mb-4 flex items-center">
                  <Info size={16} className="mr-2" /> Required Documents Checklist
                </h4>
                <div className="space-y-3">
                  <CheckItem label="Identity Proof (Aadhaar/PAN)" checked={true} />
                  <CheckItem label="Income Certificate" checked={true} />
                  <CheckItem label="Caste Certificate" checked={false} />
                  <CheckItem label="Academic Marksheets" checked={true} />
                  <CheckItem label="Bank Passbook" checked={false} />
                </div>
              </div>
            </Card>
          </div>

          {/* Documents List */}
          <div className="lg:col-span-2">
            <Card title="Your Documents" className="rounded-2xl border-none shadow-sm">
              <List
                itemLayout="horizontal"
                dataSource={documents}
                renderItem={(item) => (
                  <List.Item
                    className="p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded-xl mb-2"
                    actions={[
                      <Button key="view" type="text" icon={<Eye size={18} className="text-gray-400" />} />,
                      <Button key="delete" type="text" danger icon={<Trash2 size={18} />} onClick={() => handleDelete(item.id)} />
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                          <FileText size={24} />
                        </div>
                      }
                      title={
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-900">{item.name}</span>
                          <Tag color={item.status === 'Verified' ? 'success' : 'warning'} className="rounded-full px-2 text-[10px] font-bold uppercase">
                            {item.status}
                          </Tag>
                        </div>
                      }
                      description={
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{item.type}</span>
                          <span>•</span>
                          <span>{item.size}</span>
                          <span>•</span>
                          <span>Uploaded on {item.date}</span>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

function CheckItem({ label, checked }: { label: string, checked: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
      <span className={`text-sm ${checked ? 'text-gray-500 line-through' : 'text-gray-700 font-medium'}`}>{label}</span>
      {checked ? <CheckCircle size={18} className="text-green-500" /> : <XCircle size={18} className="text-gray-300" />}
    </div>
  );
}

export default DocumentCenter;
