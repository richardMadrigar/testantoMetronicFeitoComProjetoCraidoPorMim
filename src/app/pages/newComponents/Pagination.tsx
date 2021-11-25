import React from 'react';

const MAX_ITEMS = 5 // Maximo de buttons
const MAX_LEFT = (MAX_ITEMS - 1) / 2; //quantos bottoes maximo na esquerda

interface IProps {
  itensPerPage: number
  qtdUsers: number
  currentPage: number
  setCurrentPage: any
}

//limit é qtd de maximo para mostrar a pagina
//total = total de itens 
//currentPage é pra pular os itens da pagina 1

//offset foi trocado por currentPage
//total foi trocado por qtdUsers

const Pagination = ({ itensPerPage, qtdUsers, currentPage, setCurrentPage }: IProps) => {
  const current = currentPage ? (currentPage / itensPerPage) + 1 : 1;

  const pages = Math.ceil(qtdUsers / itensPerPage); // qtd pages
  const maxFirst = Math.max(pages - (MAX_ITEMS - 1), 1); //primeiro botão para mostrar a esquerda
  const first = Math.min( //primeiro botão para mostrar a esquerda
    Math.max(current - MAX_LEFT, 1),
    maxFirst
  );



  function onPageChange(page: number) {
    setCurrentPage((page - 1) * itensPerPage);
  }


  return (
    <>
      <button
        className="btn btn-icon m-1 btn-bg-light btn-active-color-primary btn-sm"
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
      >
        &lt;
      </button>
      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_, index) => index + first)
        .map((page) => (

          <button
            key={page} value={page}
            onClick={() => onPageChange(page)}
            className=" btn btn-icon m-1 btn-bg-light btn-active-color-primary btn-sm " >
            {page}
          </button>
        ))}

      <button
        className="btn btn-icon m-1 btn-bg-light btn-active-color-primary btn-sm "
        onClick={() => onPageChange(current + 1)}
        disabled={current === pages}
        >
        &gt;
      </button>
    </>
  )
}

export default Pagination;