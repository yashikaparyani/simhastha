import { useNavigation } from '@react-navigation/native';
import SignupScreen from '@/components/SignupScreen';

export default function Index() {
  const navigation = useNavigation();
  return <SignupScreen navigation={navigation} />;
}


