import React, { useState } from 'react';
import ScrollView from './components/scrollview';
import TagSelector from './components/Tag';

function App() {
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <div className="App" style={{ height: '100vh' }}>
      <TagSelector selectedTags={selectedTags} onTagChange={setSelectedTags} />
      <ScrollView selectedTags={selectedTags} />
    </div>
  );
}

export default App;
