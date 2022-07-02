import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { BASE_URL_CHARACTER } from '../../../constant/api';
import moment from 'moment';

const EpisodeListing = ({ episode }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if(episode){
      
      const episode_id = episode.map((url) => {
        return url.replace(BASE_URL_CHARACTER + '/episode/', '');
      })

      if(episode_id){
        axios({
          method: 'get',
          url: BASE_URL_CHARACTER + '/episode/' + episode_id,
        }).then(function (response){
          setData(Array.isArray(response?.data) ? response?.data : [response?.data])
        });
      }
    }
  }, [episode])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Episode',
      dataIndex: 'episode',
      key: 'episode',
    },
    {
      title: 'Air date',
      dataIndex: 'air_date',
      key: 'air_date',
    },
    {
      title: 'Created Date',
      dataIndex: 'created_date',
      key: 'created_date',
    }
  ]
  
  return (
    <Table 
      fixed='top'
      pagination={{position: ['bottomCenter'], pageSize: 5, pageSizeOptions: []}}
      dataSource={data.map((ep) => {
        return {
          key: 'ep-'+ep?.id,
          name: ep?.name,
          air_date: ep?.air_date,
          created_date: moment(ep?.created).format('YYYY-MM-DD H:mm:s'),
          episode: ep?.episode,
        }
      })}
      columns={columns}
    />
  );
};

export default EpisodeListing;