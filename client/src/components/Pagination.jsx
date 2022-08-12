export default function Pagination(props) {
  const { totalTools, paginate, pageQuantity } = props;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTools / pageQuantity); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li className="page-item" key={number}>
              <a onClick={() => paginate(number)} className="page-link">
                {number}{" "}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
