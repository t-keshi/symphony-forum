import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ContentHeader } from '../components/helpers/ContentHeader/ContentHeader';
import { FilterByPrefecture } from '../components/helpers/FilterByPrefeture/FilterByPrefecture';
import { Layout } from '../components/layout/Layout';
import { OrchestraList } from '../components/ui/orchestras/OrchestraList/OrchestraList';
import { useFetchOrchestras } from '../containers/controllers/orchestra/useFetchOrchestras';
import { Prefecture } from '../containers/entities/prefectures';
import { useSelect } from '../utility/hooks/useSelect';
import { useTitle } from '../utility/hooks/useTitle';

const useStyles = makeStyles((theme) => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(3),
  },
}));

export const Orchestras: React.VFC = () => {
  const classes = useStyles();
  const [selectedPrefecture, handleSelectPrefecture] = useSelect<
    Prefecture | 'すべて'
  >('すべて');
  const { data } = useFetchOrchestras({
    prefecture:
      selectedPrefecture === 'すべて' ? undefined : selectedPrefecture,
  });

  useTitle('SymphonyForum | 楽団リスト');

  return (
    <Layout>
      <div className={classes.headerWrapper}>
        <ContentHeader
          pageTitle="楽団リスト"
          pageTitleOverline="ORCHESTRA LIST"
        />
        <FilterByPrefecture
          selectedPrefecture={selectedPrefecture}
          handleSelectPrefecture={handleSelectPrefecture}
        />
      </div>
      <OrchestraList orchestras={data?.orchestras} />
    </Layout>
  );
};
