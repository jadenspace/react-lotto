import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from "./Search";
import Amount from './Amount';
import List from './List';

const LATEST_URL = `https://smok95.github.io/lotto/results/latest.json`;
const getRoundInfoUrl = (num) => `https://smok95.github.io/lotto/results/${num}.json`;

function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [lottoInfo, setLottoInfo] = useState({})
    const [turnRange, setTurnRange] = useState({})
    const [inputValue, setInputValue] = useState({})
    const [numbers, setNumbers] = useState([])
    const [bonus, setBonus] = useState([])

    const initLoad = async () => {
        const { data } = await axios.get(LATEST_URL)
        const latestIndex = data.draw_no - 1
        const value = {
            from: Math.max(0, latestIndex - 20) + 1,
            to: latestIndex + 1
        }
        setTurnRange(value)
    }
    const apiLoad = async () => {
        const info = {}
        let numbers = []
        const ajax = async (number) => {
            try {
                const { data } = await axios.get(getRoundInfoUrl(number))
                const { date, numbers, bonus_no, divisions, winners_combination } = data
                info[number] = { date, numbers, bonus_no, divisions, winners_combination }
            } catch (e) {
                console.log('err:', e)
            }
        }

        for (let i = turnRange.from; i <= turnRange.to; i++) {
            if (!lottoInfo.hasOwnProperty(i)) {
                numbers.push(i)
            }
        }

        await Promise.all(numbers.map(number => ajax(number)))
        const mergeLottoInfo = {...lottoInfo, ...info}
        console.log('mergeLottoInfo:', mergeLottoInfo)
        setLottoInfo(mergeLottoInfo)
        setIsLoading(false)
    }
    const updateNumbers = () => {
        const arr = []
        for (let i = turnRange.from; i <= turnRange.to; i++) {
            if (lottoInfo.hasOwnProperty(i)) {
                arr.push(...lottoInfo[i].numbers)
            }
        }
        setNumbers(arr)
    }
    const updateBonus = () => {
        const arr = []
        for (let i = turnRange.from; i <= turnRange.to; i++) {
            if (lottoInfo.hasOwnProperty(i)) {
                arr.push(lottoInfo[i].bonus_no)
            }
        }
        setBonus(arr)
    }

    useEffect(() => {
        initLoad()
    }, [])

    useEffect(() => {
        setInputValue(turnRange)
        apiLoad()
    }, [turnRange])

    useEffect(() => {
        updateNumbers()
        updateBonus()
    }, [lottoInfo])

    return (
        <>
            {
                isLoading
                    ? <div className="loading on">Loading...</div>
                    : <>
                        <Search inputValue={inputValue} setInputValue={setInputValue} setIsLoading={setIsLoading} setTurnRange={setTurnRange} />
                        <Amount numbers={numbers} bonus={bonus} />
                        <List turnRange={turnRange} lottoInfo={lottoInfo} />
                    </>
            }
        </>
    );
}

export default Home;
