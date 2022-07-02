import './App.scss';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { ContactsOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const App = () => {
  const menuItems = [
    {
      key:"contact",
      icon:<ContactsOutlined />,
      label: <Link to="/contact">Contact</Link>
    }
  ];
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className='logo'>Ricky and Morty</div>
        <Menu mode="inline" items={menuItems} />
      </Sider>
      <Content style={{ margin: '0' }}>
        <div className="App">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
