import { styled } from "styled-components";
import "./App.css";
import { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

const Container = styled.div`
  width: 50%;
  margin: auto;
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: auto;
  }
`;

const BigHeadText = styled.p`
  font-size: 22px;
  font-weight: 600;
`;

const HeadText = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const SubText = styled.p`
  font-size: 14px;
`;

const SubGroup = styled.div`
  max-width: 50%:
`;

const Gapper = styled.div`
  height: 44px;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

function App() {
  // solution 1 states
  const [n, setN] = useState(null);
  const [d, setD] = useState(null);
  const [occurrences, setOccurences] = useState(null);

  // solution 2 states
  const [anarInp, setAnarInput] = useState("");
  const [anargamStrs, setAnagamStrs] = useState([]);
  const [anagramOutput, setAnargamOutput] = useState([]);

  // solution 3 states
  const [colorInp, setColorInp] = useState("");
  const [colours, setColors] = useState([]);
  const [colourOutput, setColorOutput] = useState([]);

  // solution 4 states
  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");
  const [charOutput, setCharOutput] = useState(null);

  function countDigitOccurrences(N, D) {
    let count = 0;
    for (let i = 1; i <= N; i++) {
      count += i
        .toString()
        .split("")
        .filter((digit) => digit === D.toString()).length;
    }
    setOccurences(count);
    return count;
  }

  function groupAnagrams(S) {
    let totalLength = S.reduce((acc, string) => acc + string.length, 0);
    if (totalLength > 10000) {
      console.log("Sum of lengths of all strings exceeds 10000");
      return [];
    }

    for (let string of S) {
      if (string.length > 10) {
        console.log(`Length of string '${string}' exceeds the length 10`);
        return [];
      }
    }

    const anagramGroups = new Map();

    for (let string of S) {
      const charCount = new Array(26).fill(0);
      for (let char of string) {
        charCount[char.charCodeAt(0) - "a".charCodeAt(0)]++;
      }
      const key = charCount.join(",");
      if (!anagramGroups.has(key)) {
        anagramGroups.set(key, []);
      }
      anagramGroups.get(key).push(string);
    }
    setAnargamOutput(Array.from(anagramGroups.values()));
    return Array.from(anagramGroups.values());
  }

  function sortColors(colors) {
    let redPointer = 0;
    let greenPointer = 0;
    let bluePointer = colors.length - 1;

    while (greenPointer <= bluePointer) {
      if (colors[greenPointer] === "R") {
        [colors[greenPointer], colors[redPointer]] = [
          colors[redPointer],
          colors[greenPointer],
        ];
        redPointer++;
        greenPointer++;
      } else if (colors[greenPointer] === "G") {
        greenPointer++;
      } else {
        [colors[greenPointer], colors[bluePointer]] = [
          colors[bluePointer],
          colors[greenPointer],
        ];
        bluePointer--;
      }
    }
    setColorOutput(colors);
  }

  function hasAllCharacters(s1, s2) {
    const setS1 = new Set(s1);
    const setS2 = new Set(s2);

    for (let char of setS1) {
      if (!setS2.has(char)) {
        setCharOutput(false);
        return false;
      }
    }
    setCharOutput(true);
    return true;
  }

  return (
    <Container>
      <BigHeadText>Qnance ROUND 01 - SDE TEST</BigHeadText>
      <BigHeadText style={{ fontSize: "16px" }}>
        Krishnateja Kannaiah
      </BigHeadText>
      <HeadText>
        1. Given a positive integer N and a digit D, find out the number of
        occurrences of D from 1 to N.
      </HeadText>
      <SubGroup>
        <TextField
          fullWidth
          value={n}
          onChange={(e) => setN(e.target.value)}
          id="outlined-basic"
          label="Enter N"
          variant="outlined"
          sx={{ marginBottom: "12px" }}
        />

        <TextField
          value={d}
          fullWidth
          onChange={(e) => setD(e.target.value)}
          id="outlined-basi2c"
          label="Enter D"
          variant="outlined"
          sx={{ marginBottom: "12px" }}
        />

        <Button
          variant="outlined"
          fullWidth
          onClick={() => countDigitOccurrences(n, d)}
        >
          Count Digit Occurrences
        </Button>
        {occurrences !== null && <SubText>{occurrences}</SubText>}
      </SubGroup>
      <Gapper />
      <HeadText>
        2. Provided a list consisting of string S, group the string on basis of
        anagram. Two strings are considered Anagram if rearranging the letters
        of one string will result into the other string typically using all the
        original letters exactly once.
      </HeadText>
      <SubGroup>
        <TextField
          fullWidth
          value={anarInp}
          onChange={(e) => setAnarInput(e.target.value)}
          id="outlined-basic"
          label="Add Anagram string"
          variant="outlined"
          sx={{ marginBottom: "12px" }}
        />
        <Button
          onClick={() => {
            setAnagamStrs([...anargamStrs, anarInp]);
            setAnarInput("");
          }}
        >
          Add to list
        </Button>
        <FlexBox>
          {anargamStrs?.length > 0 &&
            anargamStrs.map((item) => {
              return <SubText style={{ margin: "0 10px" }}>{item}</SubText>;
            })}
          {anargamStrs?.length > 0 && (
            <Button onClick={() => setAnagamStrs([])}>Clear</Button>
          )}
        </FlexBox>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => groupAnagrams(anargamStrs)}
          sx={{ marginBottom: "14px" }}
        >
          Check Anagras
        </Button>
        {anagramOutput?.length > 0 && JSON.stringify(anagramOutput)}
      </SubGroup>
      <Gapper />
      <HeadText>
        3. Given a List of characters “R”, “G” and “B”. sort them in such a way
        that all “R”, “G” and “B” will be together, List need to be sorted in
        place.
      </HeadText>
      <SubGroup>
        <TextField
          fullWidth
          value={colorInp}
          onChange={(e) => setColorInp(e.target.value)}
          id="outlined-basic"
          label="Add strings of RGB's"
          variant="outlined"
          sx={{ marginBottom: "12px" }}
        />
        <Button
          onClick={() => {
            setColors([...colours, colorInp]);
            setColorInp("");
          }}
        >
          Add to list
        </Button>
        <FlexBox>
          {colours?.length > 0 &&
            colours.map((item) => {
              return <SubText style={{ margin: "0 10px" }}>{item}</SubText>;
            })}
          {colours?.length > 0 && (
            <Button onClick={() => setColors([])}>Clear</Button>
          )}
        </FlexBox>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => sortColors(colours)}
          sx={{ marginBottom: "14px" }}
        >
          sort
        </Button>
        {colourOutput?.length > 0 && JSON.stringify(colourOutput)}
      </SubGroup>

      <Gapper />
      <HeadText>
        4. Given two string s1 and s2. Determine if s2 has all the character
        present in s1.
      </HeadText>
      <SubGroup>
        <TextField
          fullWidth
          value={s1}
          onChange={(e) => setS1(e.target.value)}
          id="outlined-basic"
          label="Enter S1"
          variant="outlined"
          sx={{ marginBottom: "12px" }}
        />
        <TextField
          fullWidth
          value={s2}
          onChange={(e) => setS2(e.target.value)}
          id="outlined-basic"
          label="Enter S2"
          variant="outlined"
          sx={{ marginBottom: "12px" }}
        />
        <Button
          variant="outlined"
          fullWidth
          onClick={() => hasAllCharacters(s1, s2)}
          sx={{ marginBottom: "14px" }}
        >
          Check for all characters
        </Button>
        {charOutput !== null && `Has all characters: ${charOutput}`}
      </SubGroup>
      <Gapper />
      <Gapper />
      <Gapper />
      <Gapper />
      <Gapper />
      <Gapper />
    </Container>
  );
}

export default App;
