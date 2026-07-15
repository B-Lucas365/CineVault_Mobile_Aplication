import { Screen } from "./components/Screen/screen";
import { Text } from "./components/Text/Text";
import { Button } from "./components/Button/Button";
import { Input } from "./components/Input/Input";

function App() {

  return (
    <Screen style={{padding: 24, justifyContent: 'center', gap: 16}}>
      <Text variant="display">CineVault</Text>
      <Input placeholder="Email" />
      <Button label="Sign In" onPress={() => console.log('pressed')} />
    </Screen>
  );
}

export default App;
