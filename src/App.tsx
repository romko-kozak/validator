// Password Validator App
import { PasswordValidator } from "components/PasswordValidator";
import { PasswordFormData } from "utils/validation";
import "./App.css";
import { Container } from "components/PasswordValidator/styles";

function App() {
  const handleSubmit = (data: PasswordFormData) => {
    console.log("Password validated successfully:", data);
  };

  return (
    <Container>
      <PasswordValidator onSubmit={handleSubmit} />
    </Container>
  );
}

export default App;
