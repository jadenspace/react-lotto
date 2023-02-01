import {useQueries, useQuery} from 'react-query';
import { useState, useEffect, useLayoutEffect, createContext } from 'react';
import { atom, useSetRecoilState } from 'recoil';
import axios from 'axios';
import Search from "./Search";
import Amount from "./Amount";
import List from "./List";

export const LottoContext = createContext({})

const LATEST_URL = `https://smok95.github.io/lotto/results/latest.json`;
const getRoundInfoUrl = (num: any) => `https://smok95.github.io/lotto/results/${num}.json`;

export interface lottoInfoData {
    draw_no: number;
    date: string;
    numbers: Array<number>;
    bonus_no: number;
    winners_combination: any;
}

export const selectLottoInfoState = atom({
    key: 'selectLottoInfoState',
    default: []
})

export const inputValueState = atom({
    key: 'inputValueState',
    default: {}
})

function Home() {
    const [lastestNumber, setLatestNumber] = useState(99999)
    const [searchMode, setSearchMode] = useState(false)
    const [isSearch, setIsSearch] = useState(true)
    const [isProgress, setIsProgress] = useState(true)
    const [fromRound, setFromRound] = useState(0)
    const [toRound, setToRound] = useState(0)
    // const [inputValue, setInputValue] = useState({})
    // const [selectLottoInfo, setSelectLottoInfo] = useState({})
    const setSelectLottoInfo = useSetRecoilState(selectLottoInfoState)
    const setInputValue = useSetRecoilState(inputValueState)

    let latestDrawNo: number
    let from: number
    let to: number
    let valueFromTo: Array<number> = []
    let latestIndex: number = 0

    const { data: dataLatest } = useQuery(
        ['latest'],
        () => axios.get(LATEST_URL),
        {
            staleTime: 1000 * 60,
        }
    )
    const init = () => {
        latestDrawNo = dataLatest?.data.draw_no - 1
        from = !searchMode ? Math.max(0, latestDrawNo - 20) + 1 : fromRound
        to = !searchMode ? latestDrawNo + 1 : toRound
        for (let i = from; i <= to; i++) {
            valueFromTo.push(i)
        }
        latestIndex = latestDrawNo
    }
    init()
    useLayoutEffect(() => {
        if (!!latestIndex) {
            setLatestNumber(latestDrawNo)
            setFromRound(from)
            setToRound(to)
            setInputValue({
                from: from,
                to: to
            })
        }
    } , [latestIndex])

    const ress = useQueries(
        valueFromTo?.map((number: any) => {
            return {
                queryKey: ['lotto', number],
                queryFn: () => axios.get(getRoundInfoUrl(number)),
                staleTime: 1000 * 60,
                enabled: !!latestIndex
            }
        })
    )
    useEffect(() => {
        if (ress.length && !ress.some(res => res.isLoading)) {
            const info: any = ress.map((res) => {
                const { data }: any = res.data
                const { draw_no, date, numbers, bonus_no, divisions, winners_combination } = data
                return { draw_no, date, numbers, bonus_no, divisions, winners_combination }
            })
            setSelectLottoInfo(info)
            setIsProgress(false)
            setIsSearch(false)
        }
    }, [valueFromTo])

    if (isProgress && !searchMode) {
        return <div role="status" className="loading-area">
            <svg aria-hidden="true"
                 className="inline w-6 h-6 text-gray-200 animate-spin text-gray-700 fill-gray-400"
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
    }

    return (
        <LottoContext.Provider value={{lastestNumber, searchMode, setSearchMode, isSearch, setIsSearch, isProgress, setIsProgress, fromRound, setFromRound, toRound, setToRound }}>
            <div className="layout overflow-hidden text-white">
                <Search />
                <Amount  />
                <List  />
            </div>
        </LottoContext.Provider>
    );
}

export default Home;
