import imgLogin from "../../assets/login.png";
import "./styles.css";
import { TextField } from "@mui/material";
import { useHistory } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useEffect } from "react";
import useGlobal from "../../hooks/useGlobal";

import useRequest from "../../hooks/useRequest";
import toast from "../../helpers/toast";

export default function SignIn() {
  const history = useHistory();
  const { token, setToken } = useGlobal();
  const { get, post, put, del } = useRequest();

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
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

  async function handleSubmit(event) {
    event.preventDefault();

    if (!values.password || !email) {
      return toast.messageError("Preencha todos os campos");
    }
    const body = { senha: values.password, email: email };

    const result = await post("/", body, false);

    if (result) {
      setToken(true);
      history.push("/home");
    }
  }

  return (
    <main>
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
          onChange={(event) => setEmail(event.target.value)}
        />
        <FormControl
          size="small"
          sx={{ m: 1, width: "22ch" }}
          variant="outlined"
        >
          <InputLabel size="small" htmlFor="outlined-adornment-password">
            Senha
          </InputLabel>
          <OutlinedInput
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

        {/* <button>
            <a href="/signup">Cadastrar</a>
        </button> */}
    
        <button onClick={handleSubmit} className="btn-enter">
          <p>Entrar</p>
        </button>
      </div>
    </main>
  );
}
