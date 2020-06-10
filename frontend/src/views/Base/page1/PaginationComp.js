import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
export const PaginationComp = ({ skillsPerPage, totalSkills, Paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalSkills / skillsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <Pagination>
        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink onClick={() => Paginate(number)} tag="button">
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </div>
  );
};
export default PaginationComp;
