import { useState } from 'react';
import { SEARCH_MODE_CONFIG } from '../utils/search';

const navigateWithIntent = (navigate, mode, term) => {
  const { basePath, detectIntent } = SEARCH_MODE_CONFIG[mode];
  const intent = detectIntent(term);

  if (intent.kind === 'id') {
    navigate(`${basePath}/${encodeURIComponent(intent.value)}`);
    return;
  }

  if (intent.kind === 'type') {
    navigate(`${basePath}?type=${encodeURIComponent(intent.value)}`);
    return;
  }

  if (intent.kind === 'term') {
    navigate(`${basePath}?term=${encodeURIComponent(intent.value)}`);
    return;
  }

  navigate(basePath);
};

export const useSearchModeChoice = (navigate, { emptyFallback = '/cards' } = {}) => {
  const [pendingTerm, setPendingTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequireMode = (term) => {
    if (!term.trim()) {
      navigate(emptyFallback);
      return;
    }

    setPendingTerm(term);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const chooseMode = (mode) => {
    navigateWithIntent(navigate, mode, pendingTerm);
    closeModal();
  };

  return { pendingTerm, isModalOpen, handleRequireMode, closeModal, chooseMode };
};
