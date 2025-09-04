import { useNavigation } from '@react-navigation/native';
import LoginScreen from '@/components/LoginScreen';

export default function Login() {
  const navigation = useNavigation();
  return <LoginScreen navigation={navigation} />;
}
