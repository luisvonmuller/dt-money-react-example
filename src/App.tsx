import { GlobalStyle } from "./styles/global";
import { Header } from './components/Header/index';
import { Dashboard } from './components/Dashboard/index';
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal/index';
import { TransactionsContextProvider } from './hooks/useTransactions';
/* Acessibility modal */

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsContextProvider>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>
      <Dashboard />
    </TransactionsContextProvider>
  );
}
