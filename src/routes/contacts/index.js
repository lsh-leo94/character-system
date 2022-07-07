import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL_CHARACTER } from '../../constant/api';
import { Layout, Input, Spin, Select, Button } from 'antd';
import ContactCard from '../../components/contact/ContactCard'; 
import NoResultFound from '../../components/NoResultFound';

const { Sider, Content} = Layout;
const ContactList = () => {
  const searchRef = useRef();
  const listRef = useRef();
  const i = useParams();
  const [characters, setCharacter] = useState({
    results: []
  }); 
  const [searchLoading, setSearchLoading] = useState(false);
  const [filter, setFilter] = useState({});
  const [searchName, setSearchName] = useState('');
  
  const getCharacterList = (next = false, params = "") => {
    let endpoint = BASE_URL_CHARACTER + '/character';
    if(next && characters?.info?.next){
      endpoint = characters?.info?.next;
    }

    axios({
      method: 'get',
      url: endpoint + params,
    }).then(function (response){
      if(next){
        setCharacter({
          results: [
            ...characters?.results, 
            ...response.data?.results
          ],
          info: response?.data?.info 
        });
      }
      else{
        setCharacter(response.data);
      }
    }).catch(function (err){
      setCharacter({ results : [] })
    });
    setSearchLoading(false);
  }

  useEffect(() => {
    getCharacterList(false, '');
  }, []);

  const onScroll = () => {
    if(listRef?.current){
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      
      if(scrollTop + clientHeight >= scrollHeight){
        getCharacterList(true);
      }
    }
  }

  useEffect(() => {
    let params = [];

    if(filter?.name || searchName){
      params.push('name='+(filter?.name ?? searchName));
    }
    if(filter?.gender){
      params.push('gender='+filter?.gender);
    }
    if(filter?.status){
      params.push('status='+filter?.status);
    }

    if(params.length > 0){
      setSearchLoading(true)
      getCharacterList(false, "/?" + params.join('&'));
    }
    else{
      setSearchLoading(true)
      getCharacterList(false);
    }
  }, [filter])

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" width="300px">
          <div className='search-container'>
            <label className='title'>Contact</label>
              <Input.Search
                ref={searchRef}
                placeholder="Search by character name" 
                onSearch={(val) => setFilter((prev) => { return { ...prev, name: val }})} 
                onChange={(e) => {
                  e.preventDefault();
                  setSearchName(e.target.value);
                }}
                value={searchName}
                loading={searchLoading}
                style={{ width: '70%' }}
              />

              <Button 
                style={{ width: '25%', marginLeft: '3px' }} 
                onClick={() => {
                  setFilter({})
                  setSearchName('');
                }}
              >
                Clear
              </Button>
            <div>
              <Select 
                className="extra-filter"
                placeholder="Status"
                onChange={(val) => setFilter((prev) => {
                  return {
                    ...prev,
                    status: val
                  }
                })}
                value={filter?.status}
              >
                <Select.Option key="alive" value="alive">Alive</Select.Option>
                <Select.Option key="dead" value="dead">Dead</Select.Option>
                <Select.Option key="unknown" value="unknown">Unknown</Select.Option>
              </Select>

              <Select 
                className="extra-filter"
                placeholder="Gender"
                onChange={(val) => setFilter((prev) => {
                  return {
                    ...prev,
                    gender: val
                  }
                })}
                value={filter?.gender}
              >
                <Select.Option key="female" value="female">Female</Select.Option>
                <Select.Option key="male" value="male">Male</Select.Option>
                <Select.Option key="genderless" value="genderless">Genderless</Select.Option>
                <Select.Option key="unknown" value="unknown">Unknown</Select.Option>
              </Select>
            </div>
          </div>
          {characters?.results?.length > 0 ? (
            <div 
              className='listing-container'
              ref={listRef}
              onScroll={onScroll}
            >
              {characters?.results && characters?.results.map((obj) => { 
                return (
                  <ContactCard
                    key={obj?.id}
                    id={obj?.id}
                    name={obj?.name}
                    species={obj?.species}
                    image={obj?.image}
                  />
                )
              })}
              <div className='load-more-loading'>
                {characters?.info?.next && <Spin />}
              </div>
            </div>
          ) : (
            <NoResultFound />
          )}
        </Sider>
        
        <Content className='detail-content'>
          {i && (<Outlet />)}
        </Content>
      </Layout>
    </div>
  )
};

export default ContactList;