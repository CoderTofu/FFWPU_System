export default function Table(){
    return (<div className="App">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>1</th>
                    <td>James</td>
                    <td>21</td>
                    <td>Male</td>
                </tr>
                <tr>
                    <th>2</th>
                    <td>Peter</td>
                    <td>21</td>
                    <td>Male</td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>Mary</td>
                    <td>11</td>
                    <td>Female</td>
                </tr>
            </tbody>
            
        </table>
    </div>);

}