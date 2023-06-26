import React from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { device, mixins } from '../../styles/utils';

const StyledPagination = styled.div`
  padding: 1.25rem;
  ${mixins.flex('center', 'center')};

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
    }

    .page-link {
      padding: 0.313rem 0.438rem;
      ${mixins.flex('center', 'center')};
      border-radius: 0.313rem;
    }

    .active {
      background: rgba(179, 179, 179, 0.2);
    }
  }
`;

const PaginationCom = ({ changePage, totalPages }) => {
  return (
    <StyledPagination>
      <ReactPaginate
        previousLabel='<'
        nextLabel='>'
        breakLabel='...'
        onPageChange={e => changePage(e.selected + 1)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        pageCount={totalPages > 500 ? 500 : totalPages || 200}
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageClassName='page-link '
        breakClassName='page-link '
        previousLinkClassName='page-link '
        nextLinkClassName='page-link '
        activeClassName='active'
      />
    </StyledPagination>
  );
};

export const Pagination = React.memo(PaginationCom);
