"use client";

import Revenue from "@/component/AdminRevenue/revenue";
import { useProviders } from "@/hooks/useRevenue";

import useRevenue from "@/hooks/useRevenue";

const MainDisplay = () => {
    const { providers, loading} = useProviders();
  const {
    filterOpen,
    filtered,
    setFilterOpen: handleFilterClose,
    filterState,
    setFilterState: handleFilterStateChange,
    handleSearch,
    handleFilterOpen,
    handleExportAll,
categoryData
  
  } = useRevenue({ providers });

  console.log('categoryData', categoryData);
  console.log('filtered', filtered);


    
  return (
    <div>
      <Revenue loading={loading} categoryData={categoryData} filtered={filtered} filterOpen={filterOpen} setFilterOpen={handleFilterClose} filterState={filterState} setFilterState={handleFilterStateChange} handleSearch={handleSearch} handleFilterOpen={handleFilterOpen} handleExportAll={handleExportAll} />
    </div>

  )
  
}

export default MainDisplay
