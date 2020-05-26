import dayjs from 'dayjs'
import { useState } from 'react'

const Calendar = () => {
    const [ date, setDate ] = useState(dayjs())

    const Wrap = props => {
        return (
            <div className="wrap">{ props.children }</div>
        )
    }

    const Navigation = () => {
        return (
            <div className="navigation">
                <button onClick={ () => setDate(date.subtract(1, 'month')) }>&#x3C;</button>{' '}
                <div className="title">{ date.format('MMMM YYYY') }</div>
                <button onClick={ () => setDate(date.add(1, 'month')) }>&#x3E;</button>
           </div>
        )
    }

    const Day = props => {
        return (
            <div className={props.class} date={props.date}>
                {props.day}
            </div>
        )
    }

    const Table = () => {
        let table = []        
        const firstDayFirstWeek = date.startOf('month').startOf('week').get('D')
        const lastDayMonth = date.endOf('month').get('D')
        const wdFirstDay = date.startOf('month').get('day')
        const wdLastDayLastWeek = date.endOf('month').get('day')
        
        // Week days
        for (let i = 0; i < 7; i++)
            table.push( <div key={'weekday' + i} className="weekday">{date.day(i).format('ddd')}</div> )

        // Previous month days
        for (let i = 0; i < wdFirstDay; i++)
            table.push( <Day key={'prevday' + i} day={firstDayFirstWeek + i } class="inactive" /> )

        // Current month days
        for (let i = 1; i <= lastDayMonth; i++)
            table.push( <Day key={'day'+ i} day={i} date={date.date(i).format('YYYY-MM-DD')} /> )
            
        // Next month days
        for (let i = 1; i < (7 - wdLastDayLastWeek); i++)
            table.push( <Day key={'nextday' + i} day={i} class="inactive" /> )

        return ( <div className="table">{ table }</div>)
    }

    return (
        <Wrap>
           <Navigation />
           <Table />
           <style jsx global>{`
                .table {
                    width: 100%;
                    display: grid;
                    grid-template-columns: auto auto auto auto auto auto auto;
                    grid-template-row: auto auto auto auto auto auto auto;
                    border-radius: 4px;
                    overflow: hidden;
                }
                
                .table > div {
                    text-align: center;
                    padding: 0.8rem;
                    font-size: 14px;
                    font-weight: 400;
                }
                
                .table > div.weekday {
                    color: #999;
                    font-weight: 300;
                    margin: 0;
                    font-size: 12px;
                }
                
                .table > div.inactive {
                    color: #999;
                }
                
                .navigation {
                   display: flex;
                   padding: 1rem 0;
                   justify-content: space-between;
                }
                
                .navigation .buttons {
                    margin-left: auto;
                }
                
                .navigation .buttons button {
                    height: 30px;
                    width: 30px;
                }
                
                .navigation .title {
                    font-size: 24px
                }

                .wrap {
                    font-family: Helvetica, sans-serif;
                    max-width: 400px;
                    margin: 0 auto;
                }
           `}
           </style>
        </Wrap>
    )
}

export default Calendar