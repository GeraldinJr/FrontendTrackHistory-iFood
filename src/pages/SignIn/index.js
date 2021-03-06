import "./styles.css";
import { TextField } from "@mui/material";
import { Link, useHistory } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import useGlobal from "../../hooks/useGlobal";

import useRequest from "../../hooks/useRequest";
import toast from "../../helpers/toast";
import imgLogin from "../../assets/login.png";
import Button from "../../components/Button";

export default function SignIn() {
  const history = useHistory();
  const { setToken, setNomeEntregador } = useGlobal();
  const { post } = useRequest();

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [email, setEmail] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function handleSubmit() {
    if (!values.password || !email) {
      return toast.messageError("Preencha todos os campos");
    }
    const body = { senha: values.password, email, setNomeEntregador };

    const result = await post("/pessoa-entregadora/login", body, false);
    if (result) {
      setToken(result.token);
      setNomeEntregador(result.nome);
      history.push("/pedidos");
    }
  }
  return (
    <div className="container-login">
      <h3 style={{ fontWeight: "normal" }}>
        <b>iFood</b> para <br /> Entregadores
      </h3>
      <img src={imgLogin} alt="imagem login" />
      <TextField
        size="small"
        id="outlined-basic"
        label="Email"
        variant="outlined"
        sx={{ width: "95%" }}
        onChange={(event) => setEmail(event.target.value)}
      />
      <FormControl size="small" sx={{ m: 0, width: "95%" }} variant="outlined">
        <InputLabel size="small" htmlFor="outlined-adornment-password">
          Senha
        </InputLabel>
        <OutlinedInput
          onKeyDown={(e) => {
            // eslint-disable-next-line no-unused-expressions
            e.key === "Enter" ? handleSubmit() : null;
          }}
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button text="Entrar" onClickProp={handleSubmit} />
      <div className="btn-aux">
        <p>N??o tem cadastro?&nbsp;</p> <Link to="/cadastrar">Clique aqui!</Link>
      </div>
    </div>
  );
}
