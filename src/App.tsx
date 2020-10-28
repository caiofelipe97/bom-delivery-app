import React from 'react';
import { View, StatusBar } from 'react-native';

const App: React.FC = () => (
  <>
    <StatusBar barStyle="light-content" translucent />
    <View style={{ flex: 1, backgroundColor: '#F6F2F8' }} />
  </>
);

export default App;
