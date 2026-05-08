import { Header, Nav } from '@/components/common/Layout';
import { Button } from '@/components/common/Button';
import BubbleOutLogo from '@/assets/bubble-out-logo.png';
import { useLocation } from 'wouter';


const HeaderLayout = () => {
  const [, setLocation] = useLocation();

  return (
    <Header>
      <div className="flex items-center gap-2">
        <img src={BubbleOutLogo} alt="Bubble-Out Logo" className="w-37 h-12 cursor-pointer" onClick={() => setLocation('/')} />
      </div>
      <Nav>
        <a href="#features" className="text-sm font-medium hover:text-primary transition-all duration-300 ease-out">
          서비스 소개
        </a>
        <a href="#faq" className="text-sm font-medium hover:text-primary transition-all duration-300 ease-out">
          FAQ
        </a>
        <Button size="sm" onClick={() => setLocation('/input')}>
          내 피드 분석하기
        </Button>
      </Nav>
    </Header>
  );
};

export default HeaderLayout;