import React from 'react'
import './Sessions.css'

const Sessions = () => {
    return (
        <>
        <div className='rowC'>
        
            <table className="table">
                <th colSpan={4}>
                    User Times:
                </th>
                <tbody>
                    <tr>
                        <th className="click">⌕</th>
                        <th>time</th>
                        <th>ao5</th>
                        <th>ao12</th>
                    </tr>
                    <tr data={303}>
                        <td className="times">304</td>
                        <td className="times">23.62</td>
                        <td className="times">23.12</td>
                        <td className="times">24.12</td>
                    </tr>
                    <tr data={302}>
                        <td className="times">303</td>
                        <td className="times">21.76</td>
                        <td className="times">23.78</td>
                        <td className="times">24.01</td>
                    </tr>
                    <tr data={301}>
                        <td className="times">302</td>
                        <td className="times">25.62</td>
                        <td className="times">25.40</td>
                        <td className="times">24.65</td>
                    </tr>
                </tbody>
            </table>
        </div>

        </>
    )
}

export default Sessions