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
        <div className="layout overflow-hidden text-white">
            {
                isLoading
                    ? <div role="status">
                        <svg aria-hidden="true"
                             className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="loading on sr-only">Loading...</span>
                    </div>
                    : <>
                        <Search inputValue={inputValue} setInputValue={setInputValue} setIsLoading={setIsLoading} setTurnRange={setTurnRange} />
                        <Amount numbers={numbers} bonus={bonus} />
                        <List turnRange={turnRange} lottoInfo={lottoInfo} />
                    </>
            }
        </div>
    );
}

export default Home;
