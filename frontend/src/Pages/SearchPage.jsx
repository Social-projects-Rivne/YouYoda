import React from 'react';

import Footer from '../Components/Footer';
import PageHeader from '../Components/PageHeader';
import SearchContent from '../Components/SearchContent';


const SearchPage = (props) => (
    <>
        <PageHeader />
        <SearchContent {...props} />
        <Footer />
    </>
);

export default SearchPage;