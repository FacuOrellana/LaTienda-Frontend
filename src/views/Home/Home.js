import React from 'react';
import FlexContainer from '../../components/Containers/FlexContainer';
import TablePageContainer from '../../components/Containers/TablePageContainer';
import CustomizedTables from '../../components/table/Table';

const columns = [
  {
    headerText: "id",
    selector: "id",
    hidden: true,
  },
  {
    headerText: "asdf",
    selector: "asdf",
  },
  {
    headerText: "asdf2",
    selector: "asdf2",
  },
  {
    headerText: "asdf3",
    selector: "asdf3",
  },
]

const data = [
  {
    id: 1,
    asdf: "asdf",
    asdf2: "asdf",
    asdf3: "asdf",
  },
  {
    id: 2,
    asdf: "asdf",
    asdf2: "asdf",
    asdf3: "asdf",
  },
  {
    id: 3,
    asdf: "asdf",
    asdf2: "asdf",
    asdf3: "asdf",
  },
]

const Home = () => {
  return (
    <div>
      <FlexContainer>
        <h1>Bienvenido Al Sistema de Ventas de La Tienda</h1>
      </FlexContainer>
    </div>
  );
};

export default Home;
