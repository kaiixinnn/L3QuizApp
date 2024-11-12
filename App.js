import React, { useState } from 'react';
import { View, Text, Image, Button, Alert, TextInput, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome6';

const InputBox = ({ label, onChangeText }) => {
  return (
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: '#333', fontSize: 16, marginBottom: 5 }}>{label}</Text>
        <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#d3d3d3',
              padding: 8,
              backgroundColor: '#f5f5f5',
              borderRadius: 5,
              width: 350,
            }}
            onChangeText={onChangeText}
        />
      </View>
  );
};

const Question = ({ text, image, options, selectedOption, onValueChange }) => (
    <View style={{ marginBottom: 20, alignItems: 'center' }}>
      <Image source={image} style={{ width: 300, height: 200, borderRadius: 10 }} />
      <Text style={{ marginVertical: 10, fontSize: 16, color: '#333' }}>{text}</Text>
      <RNPickerSelect
          onValueChange={onValueChange}
          items={options.map((option) => ({ label: option, value: option }))}
          placeholder={{ label: "Select an answer...", value: "" }}
          style={{
            inputIOS: {
              height: 50,
              width: 300,
              borderColor: '#d3d3d3',
              borderWidth: 1,
              padding: 10,
              backgroundColor: '#f5f5f5',
              color: '#333',
              borderRadius: 5,
            },
            inputAndroid: {
              height: 50,
              width: 300,
              borderColor: '#d3d3d3',
              borderWidth: 1,
              padding: 10,
              backgroundColor: '#f5f5f5',
              color: '#333',
              borderRadius: 5,
            },
          }}
          value={selectedOption}
      />
    </View>
);

const App = () => {
  const [username, setUsername] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const correctAnswers = ["Elephant", "Leopard", "Rabbit"];

  const handleAnswerChange = (answer, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) score += 1;
    });
    return score;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    Alert.alert(`You have ${score} correct answer${score !== 1 ? 's' : ''}!`);
  };

  return (
      <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#F5F5DC' }}>
        {/* Header with Icons and Text */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Icon name="paw" size={50} color="#8B4513" style={{ marginHorizontal: 5 }} />
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#333', marginHorizontal: 10 }}>ANIMAL QUIZ</Text>
          <Icon name="paw" size={50} color="#8B4513" style={{ marginHorizontal: 5 }} />
        </View>

        {/* Input Box for Username */}
        <InputBox label="User Name:" onChangeText={(text) => setUsername(text)} />

        {/* Questions */}
        <Question
            text="What animal is this test?"
            image={require('./img/elephant.jpg')}
            options={["Elephant", "Rhino", "Hippo"]}
            selectedOption={answers[0]}
            onValueChange={(value) => handleAnswerChange(value, 0)}
        />
        <Question
            text="What animal is this?"
            image={require('./img/leopard.jpg')}
            options={["Leopard", "Tiger", "Lion"]}
            selectedOption={answers[1]}
            onValueChange={(value) => handleAnswerChange(value, 1)}
        />
        <Question
            text="What animal is this?"
            image={require('./img/rabbit.jpg')}
            options={["Parrot", "Eagle", "Rabbit"]}
            selectedOption={answers[2]}
            onValueChange={(value) => handleAnswerChange(value, 2)}
        />

        {/* Submit Button */}
        <View style={{ marginTop: 20, width: '80%', borderRadius: 5 }}>
          <Button title="Submit Answers" onPress={handleSubmit} color="#5A9" />
        </View>
      </ScrollView>
  );
};

export default App;
