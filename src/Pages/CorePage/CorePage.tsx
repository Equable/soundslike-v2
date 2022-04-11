import { Header, Title } from "@mantine/core";
import './CorePage.css'

interface Props {
  children: any;
}

const CorePage: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="coreContainer">
      <div style={{width:"100%"}}>
        <Header
          height={80}
          p="lg"
          className="header"
        >
          <Title>Sounds Like Web App</Title>
        </Header>
      </div>
      <div className="coreChildren">
        {children}
      </div>
    </div>
  );
};

export default CorePage;
