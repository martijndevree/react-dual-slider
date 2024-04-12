import SleepRangeGroup from '@src/components/groups/SleepRange/SleepRangeGroup';
import MainContainerTemplate from '@src/components/templates/MainContainer/MainContainerTemplate';
import './styles/global.scss';

function App() {
  return (
    <MainContainerTemplate>
      <SleepRangeGroup />
    </MainContainerTemplate>
  );
}

export default App;
