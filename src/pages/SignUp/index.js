import "./styles.css";
import { TextField } from "@mui/material";
import { /* useHistory, */ Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

// import useRequest from "../../hooks/useRequest";
import toast from "../../helpers/toast";
import imgLogin from "../../assets/login.png";
import Button from "../../components/Button";

export default function SignUp() {
  // const history = useHistory();
  // const { post } = useRequest();

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
    confirmPassword: "",
    showConfirmPassword: false,
  });

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function handleSubmit() {
    console.log(values);
    if (!values.password || !email || !nome || !values.confirmPassword) {
      return toast.messageError("Preencha todos os campos");
    }
    if (values.password !== values.confirmPassword) {
      return toast.messageError("As senhas não são iguais");
    }
    // const body = {
    //   email,
    //   nome,
    //   senha: values.password,
    //   confirmPassword: values.confirmPassword,
    // };

    // const result = await post("/", body, false);

    // if (result) {
    //   history.push("/login");
    // }
  }
  return (
    <main>
      <div className="container-signup">
        <h3 style={{ fontWeight: "normal" }}>
          <b>iFood</b> para <br /> Entregadores
        </h3>

        <img src={imgLogin} alt="imagem login" />

        <TextField
          size="small"
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          sx={{ width: "62%" }}
          onChange={(event) => setNome(event.target.value)}
        />
        <TextField
          size="small"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{ width: "62%" }}
          onChange={(event) => setEmail(event.target.value)}
        />
        <FormControl
          size="small"
          sx={{ m: 0, width: "62%" }}
          variant="outlined"
        >
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

        <FormControl
          size="small"
          sx={{ m: 0, width: "62%" }}
          variant="outlined"
        >
          <InputLabel size="small" htmlFor="outlined-adornment-password">
            Confirme a Senha
          </InputLabel>
          <OutlinedInput
            onKeyDown={(e) => {
              // eslint-disable-next-line no-unused-expressions
              e.key === "Enter" ? handleSubmit() : null;
            }}
            id="outlined-adornment-password"
            type={values.showConfirmPassword ? "text" : "confirmPassword"}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
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
        <Button text="Cadastrar" onClickProp={handleSubmit} />
        <div className="btn-aux">
          <p>Já tem cadastro?&nbsp;</p>
          <Link to="/login">Clique aqui!</Link>
        </div>
      </div>
    </main>
  );
}
