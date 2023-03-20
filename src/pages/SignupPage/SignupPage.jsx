import React, { useState } from "react";
import "../SignupPage/signupPage.sass";
import {
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import Header from "../../layout/Header/Header";
import { useNavigate } from "react-router-dom";
import { goToHomePage } from "../../routes/coordinator";
import axios from "axios";
import { BASE_URL } from "../../constants/url";

const SignupPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const onChangeForm = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setForm({ ...form, [name]: value });
  };

  const signup = async (event) => {
    event.preventDefault();

    try {
      const body = {
        name: form.name,
        email: form.email,
        password: form.password,
      };

      const response = await axios.post(BASE_URL + "/users/signup", body);
      window.localStorage.setItem("labeddit-token", response.data.token);
      goToHomePage(navigate);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="flex">
        <p className="title" id="title-signup">
          Olá, boas vindas ao LabEddit ;)
        </p>
      </div>
      <Flex gap="2" direction="column" align="center">
        <form onSubmit={signup} autoComplete="off">
          <Input
            placeholder="Apelido"
            size="lg"
            maxWidth="400px"
            name={"name"}
            value={form.name}
            onChange={onChangeForm}
          />
          <Input
            placeholder="E-mail"
            size="lg"
            maxWidth="400px"
            name={"email"}
            value={form.email}
            onChange={onChangeForm}
          />
          <InputGroup size="lg" maxWidth="400px">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Senha"
              name={"password"}
              value={form.password}
              onChange={onChangeForm}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                color="gray.400"
              >
                {show ? "Esconder" : "Mostrar"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </Flex>
      <div className="flex">
        <p id="text-signup">
          Ao continuar, você concorda com o nosso{" "}
          <a id="link" onClick={onOpen}>
            Contrato de usuário
          </a>{" "}
          e nossa{" "}
          <a id="link" onClick={onOpen}>
            Política de Privacidade
          </a>
        </p>
      </div>
      <div className="flex">
        <Checkbox borderColor="gray.300">
          Eu concordo em receber emails sobre coisas legais no Labeddit
        </Checkbox>
      </div>
      <div className="flex" id="buttons">
        <a className="btn-login" onClick={signup}>
          {isLoading ? <Spinner /> : "Cadastrar"}
        </a>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent marginX="30">
            <ModalHeader>Lorem Ipsum</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              eleifend tristique leo, non ullamcorper sapien efficitur at.
              Aliquam ultrices neque a quam dignissim, rhoncus tristique risus
              feugiat. Mauris ut luctus lacus, dignissim sagittis neque.
              Praesent feugiat condimentum lacinia. Morbi sit amet urna sit amet
              leo fermentum iaculis. Curabitur at tortor eget turpis malesuada
              efficitur. In et tortor eu ante tincidunt interdum. Praesent vel
              mauris sit amet orci dignissim posuere. In id convallis velit.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default SignupPage;
