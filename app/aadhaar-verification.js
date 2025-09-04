import { useNavigation } from '@react-navigation/native';
import AadhaarVerificationScreen from '@/components/AadhaarVerificationScreen';

export default function AadhaarVerification() {
  const navigation = useNavigation();
  return <AadhaarVerificationScreen navigation={navigation} />;
}
