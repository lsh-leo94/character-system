import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { BASE_URL_CHARACTER } from '../../constant/api';
import { Col, Row } from 'antd';
import EpisodeListing from '../../components/contact/detail/EpisodeListing';

const ContactDetail = (props) => {
  const [character, setCharacter] = useState({});
  const params = useParams();
  const getCharacterDetail = (id) => {
    axios({
      method: 'get',
      url: BASE_URL_CHARACTER + '/character/' + id,
    }).then(function (response){
      setCharacter(response?.data)
    });
  }

  useEffect(() => {
    if(params?.id){
      getCharacterDetail(params?.id);
    }
  }, [params]);

  return (
    <div className="character-detail">
      <Row>
        <Col span={24}>
          <div className="header">
            <div className='title-image'>
              <img className='character-img' src={character?.image} height="200px" /> 
            </div>
            <div className="title">
              {character?.name}
            </div>
          </div>
        </Col>
      </Row>
      
      <div className="personal-info">
        <Row>
          <Col span={24}><div className='title'>Personal Info</div></Col>
        </Row>
        <div className='content'>
          <Row>
              <Col span={8}><label className='label'>Species:</label><label className='info'>{character?.species}</label></Col>
              <Col span={8}><label className='label'>Gender:</label><label className='info'>{character?.gender}</label></Col>
          </Row>
          <Row>
              <Col span={8}><label className='label'>Status:</label><label className='info'>{character?.status}</label></Col>
              <Col span={8}><label className='label'>Created Date:</label><label className='info'>{character?.created}</label></Col>

          </Row>
          <Row>
              <Col span={8}><label className='label'>Origin:</label><label className='info'>{character?.origin?.name}</label></Col>
              <Col span={8}><label className='label'>Location:</label><label className='info'>{character?.location?.name}</label></Col>
          </Row>
        </div>
      </div>

      {character?.episode && (
        <div className='episode-info'>
          <div className='title'>
            Episodes
          </div>
          <div>
            <EpisodeListing episode={character?.episode} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDetail;