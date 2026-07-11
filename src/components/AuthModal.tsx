'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      router.push(`/auth?mode=${initialTab === 'signup' ? 'signup' : 'login'}`);
      onClose();
    }
  }, [isOpen, initialTab, router, onClose]);

  return null;
};

export default AuthModal;
