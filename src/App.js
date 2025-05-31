import React, { useState } from 'react';
import ScrollView from './components/scrollview';
import TagSelector from './components/Tag';
import Footer from './components/footer';
import { Box } from '@mui/material';

function App() {
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Box component="main" flexGrow={1}>
        <TagSelector selectedTags={selectedTags} onTagChange={setSelectedTags} />
        <ScrollView selectedTags={selectedTags} />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;