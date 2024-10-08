import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


export default function FormCadCliente(props) {
    const [cliente, setCliente] = useState({
        nome: "",
        cpf: "",
        endereco: "",
        cep: "",
        telefone: "",
        email: ""
    });

    const [validated, setFormValidated] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoAlterar) {
                // Alterar cliente
                props.setListaDeClientes(props.listaClientes.map((item) => {
                    return item.cpf !== props.clienteSelecionado.cpf ? item : props.clienteSelecionado;
                }));
                props.setModoAlterar(false);
            } else {
                // Cadastrar cliente
                props.setListaDeClientes([...props.listaClientes, cliente]);
            }
            props.setExibirTabela(true);
        } else {
            setFormValidated(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        if (props.modoAlterar) {
            props.setClienteSelecionado({ ...props.clienteSelecionado, [elemento]: valor });
        } else {
            setCliente({ ...cliente, [elemento]: valor });
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={props.modoAlterar ? props.clienteSelecionado.nome : cliente.nome}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="cpf"
                        name="cpf"
                        disabled={props.modoAlterar} // CPF não pode ser alterado
                        value={props.modoAlterar ? props.clienteSelecionado.cpf : cliente.cpf}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={props.modoAlterar ? props.clienteSelecionado.endereco : cliente.endereco}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="cep"
                        name="cep"
                        value={props.modoAlterar ? props.clienteSelecionado.cep : cliente.cep}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={props.modoAlterar ? props.clienteSelecionado.telefone : cliente.telefone}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        id="email"
                        name="email"
                        value={props.modoAlterar ? props.clienteSelecionado.email : cliente.email}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    {props.modoAlterar ? (
                        <Button type="submit">Alterar</Button>
                    ) : (
                        <Button type="submit">Cadastrar</Button>
                    )}
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => { props.setExibirTabela(true); }}>Voltar</Button>
                </Col>
            </Row>
        </Form>
    );
}
