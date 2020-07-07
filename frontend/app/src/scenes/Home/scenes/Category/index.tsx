import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { CategoryStateProps } from './interfaces';
import { Category } from '../../interfaces';
import { Col, Row, Table, Typography } from 'antd';
import styles from './styles.css';
import { handleApiError } from '../../../../services/util/errorHandler';
import { Link } from 'react-router-dom';
const { Title } = Typography;

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // eslint-disable-next-line react/display-name
    render: (text: string, record: Category) => {
      const categoryName = text
        .trim()
        .replace(/\s+|\//g, '-')
        .toLowerCase();
      return <Link to={`${record.id}/${categoryName}`}>{text}</Link>;
    },
  },
  {
    key: 'edit',
    // eslint-disable-next-line react/display-name
    render: () => <a>Edit</a>,
  },
];
class Categories extends React.Component<{}, CategoryStateProps> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: false,
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(window.location.origin + '/core/academix/categories')
      .then((result: AxiosResponse<Category[]>) => {
        if (result.status == 200) {
          this.setState({
            isLoading: false,
            categories: result.data,
          });
        }
      })
      .catch((error) => {
        handleApiError(
          error,
          'Something went wrong when trying to load categories'
        );
        this.setState({ isLoading: false });
      });
  }
  render() {
    return (
      <Row className={styles.content}>
        <Col md={24} lg={{ span: 20, offset: 2 }}>
          <Title>Categories</Title>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={this.state.categories}
            loading={this.state.isLoading}
            className={styles.column}
          />
        </Col>
      </Row>
    );
  }
}

export default Categories;