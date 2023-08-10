import React from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { device, mixins } from "../../styles/utils";

const StyledPagination = styled.div`
  padding: 1.25rem;
  ${mixins.flex("center", "center")};

  .pagination {
    display: flex;
    gap: 0.313rem;

    @media ${device.laptop} {
      gap: 0.625rem;
    }

    li {
      visibility: visible;
      opacity: 1;
      transition: ${({ theme }) => theme.transition};

      &.disabled {
        visibility: hidden;
        opacity: 0;
      }

      a {
        padding: 0.313rem 0.438rem;
        border-radius: 0.313rem;
        color: ${({ theme }) => theme.colors.blue};
      }
    }

    .page-link {
      ${mixins.flex("center", "center")};

      &.active {
        a {
          background: ${({ theme }) => theme.colors.blue};
          color: ${({ theme }) => theme.colors.white};
        }
      }
    }
  }
`;

const PaginationCom = ({ changePage, totalPages, forcedPage }) => {
  const changeThePage = (e) => {
    changePage(e.selected + 1);
  };

  return (
    <StyledPagination>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        onPageChange={(e) => changeThePage(e)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        pageCount={totalPages > 500 ? 500 : totalPages || 200}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-link "
        breakClassName="page-link "
        previousLinkClassName="page-link "
        nextLinkClassName="page-link "
        activeClassName="active"
        forcePage={forcedPage}
      />
    </StyledPagination>
  );
};

export const Pagination = React.memo(PaginationCom);
