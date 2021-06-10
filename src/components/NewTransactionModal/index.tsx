import Modal from 'react-modal';
import { FormEvent, useState } from 'react';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';
import { useTransactions } from '../../hooks/useTransactions';
Modal.setAppElement("#root");

interface NewTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('deposit');

    async function handleNewTransaction(event: FormEvent) {
        event.preventDefault();
        await createTransaction({
            title, category, amount, type
        });
        /* Resetar os campos */
        setTitle('');
        setCategory('');
        setAmount(0);
        setType('deposit');
        /* Fechar o modal */
        onRequestClose();
    }
    return (
        <Modal
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close">
                <img src={closeImg} alt="Close Modal" />
            </button>
            <Container onSubmit={handleNewTransaction}>
                <h2>Cadastrar informação</h2>
                <input placeholder="Título" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                <input placeholder="Valor" type="number" value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={IncomeImg} alt="Entrada Ícone" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={OutcomeImg} alt="Saída Ícone" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input placeholder="Categoria" type="text" value={category} onChange={(event) => setCategory(event.target.value)} />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}