import React from 'react'

const Footer=() =>
{
        const date = new Date();
  return (
    <footer><b>Copyright &copy {date.getFullYear()}</b></footer>
  )
}

export default Footer