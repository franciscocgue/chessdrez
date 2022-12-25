import React from 'react'
import renderer from 'react-test-renderer';
import Cell from './Cell';
import peonwhite from '../assets/peon_blanco.png';

it('shows possible moves when pawn cell 78 hovered', () => {
    const component = renderer.create(
        <Cell
            key={'78'}
            // img={peonwhite}
            row={7}
            col={8}
            color={'white'}
            piece={'peon'}
        />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})