'use client';

import Revenue from '@/component/AdminRevenue/revenue';
import { useProviders } from '@/hooks/useRevenue';
import useRevenue from '@/hooks/useRevenue';

const MainDisplay = () => {
  const { providers, loading } = useProviders();
  const {
    filterOpen,
    filtered,
    setFilterOpen,
    filterState,
    handleSearch,
    handleFilterOpen,
    handleFilterApply,
    handleFilterReset,
    handleExportAll,
    uniqueServices,
  } = useRevenue({ providers });

  return (
    <div>
      <Revenue
        loading={loading}
    
        filtered={filtered}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        filterState={filterState}
        handleSearch={handleSearch}
        handleFilterOpen={handleFilterOpen}
        handleFilterApply={handleFilterApply}
        handleFilterReset={handleFilterReset}
        handleExportAll={handleExportAll}
        uniqueServices={uniqueServices}
      />
    </div>
  );
};

export default MainDisplay;
