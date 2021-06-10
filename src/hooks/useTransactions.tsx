import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { api } from '../services/api';


interface TransactionProps {
    id: number,
    title: string,
    type: string,
    amount: number,
    category: string,
    createdAt: string,
}

type TransactionInput = Omit<TransactionProps, 'id' | 'createdAt'>;

interface TransactionsContextProps {
    children: ReactNode
}

interface TransactionsContextData {
    transactions: TransactionProps[];
    createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsContextProvider({ children }: TransactionsContextProps) {
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);
    useEffect(() => {
        api.get('/transactions')
            .then(response => setTransactions(response.data.transactions));
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', { ...transactionInput, createdAt: new Date() });
        const { transaction } = response.data;
        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    return context;
}