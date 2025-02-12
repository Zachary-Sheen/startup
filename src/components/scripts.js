// const toggler = document.querySelector('.toggler-btn');
// toggler.addEventListener('click', function(){
//     document.querySelector('#sidebar').classList.toggle('collapsed');
// });
// function toggleMenu() { #FIX BUTTON GIVES ERROR RIGHT NOW
//     document.querySelector('#sidebar').classList.toggle('collapsed');
// }
// function App() {
    // const [count,setCount] = React.useState(0);

    // function Increment() {
    //     setCount(count + 1);}
    // function Decrement() {
    //     setCount(count - 1);}
    // return (
    //     <div>
    //         <h1>{count}</h1>
    //         <button onClick={Increment}>Increment</button>
    //         <button onClick={Decrement}>Decrement</button>
    //     </div>
//}
// dict example
// const dict = {
//     first: 'first',
//     second: 'second',
//     third: 'third',
//     f: function() {
//         console.log('f');
//     }
// };
// Adding a new key-value pair
// dict.fourth = 'fourth';


// 1 line update
// function CLicker({ initialCount}) {
//     const [count, setCount] = React.useState(initialCount);
//     return <div onClick={() => setCount(count + 1)}>Click count: {count}</div>;
// }
// array distrubution
// const arr = [1,2,3,4,5];
// const [a,b,...c] = arr;
//...c is the rest operator

// local storage example
// const obj = {name: 'value'};
// localStorage.setItem('obj', JSON.stringify(obj));
// const obj = JSON.parse(localStorage.getItem('obj'));
// How to get name and name's value
// const name = obj.name;
// const value = obj[name];

//json example
// const obj = {name: 'value'};
// const json = JSON.stringify(obj);
// const obj = JSON.parse(json);

// use effect example
// React.useEffect(() => {
//     console.log('use effect');
// });

// conditional effect
// React.useEffect(() => {
//     console.log('use effect');
// }, [count]);