import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import colors from '../../assets/theme/base/colors';

const MenuAppBar = ({ setSelectedDataset, setSelectedModel }) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
        const [selectedMenu, setSelectedMenu] = useState(null);
        const [checkedItems, setCheckedItems] = useState({
                antique: true,
                wikipedia: false,
        });
        const [subMenuCheckedItems, setSubMenuCheckedItems] = useState({
                tfidf: true,
                embedding: false,
        });

        useEffect(() => {
                setSelectedDataset('antique');
                setSelectedModel('tfidf');
        }, [setSelectedDataset, setSelectedModel]);

        const handleMenuOpen = (event) => {
                setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
                setAnchorEl(null);
                setSubMenuAnchorEl(null);
                setSelectedMenu(null);
        };

        const handleSubMenuOpen = (event, menu) => {
                setSubMenuAnchorEl(event.currentTarget);
                setSelectedMenu(menu);
                setSelectedDataset(menu);
                console.log("SubMenu Open - Selected Dataset:", menu);
        };

        const handleSubMenuClose = () => {
                setSubMenuAnchorEl(null);
                setSelectedMenu(null);
        };

        const handleCheckboxChange = (event) => {
                const { name } = event.target;
                const newCheckedItems = {
                        antique: false,
                        wikipedia: false,
                };
                newCheckedItems[name] = event.target.checked;

                setCheckedItems(newCheckedItems);
                setSelectedDataset(name);
                console.log("Checkbox Change - Selected Dataset:", name);
        };

        const handleSubMenuCheckboxChange = (event) => {
                const { name } = event.target;
                const newSubMenuCheckedItems = {
                        tfidf: false,
                        embedding: false,
                };
                newSubMenuCheckedItems[name] = event.target.checked;

                setSubMenuCheckedItems(newSubMenuCheckedItems);
                setSelectedModel(name);
                console.log("SubMenu Checkbox Change - Selected Model:", name);
        };

        const open = Boolean(anchorEl);
        const subMenuOpen = Boolean(subMenuAnchorEl);

        return (
                <div>
                        <AppBar position="static">
                                <Toolbar>
                                        <IconButton
                                                edge="start"
                                                color="inherit"
                                                aria-label="menu"
                                                onClick={handleMenuOpen}
                                        >
                                                <MenuIcon sx={{ color: colors.white.main }} />
                                        </IconButton>
                                </Toolbar>
                        </AppBar>
                        <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                        >
                                <MenuItem onClick={(e) => handleSubMenuOpen(e, 'antique')}>
                                        <FormControlLabel
                                                control={
                                                        <Checkbox
                                                                checked={checkedItems.antique}
                                                                onChange={handleCheckboxChange}
                                                                name="antique"
                                                        />
                                                }
                                                label="ANTIQUE"
                                        />
                                </MenuItem>
                                <MenuItem onClick={(e) => handleSubMenuOpen(e, 'wikipedia')}>
                                        <FormControlLabel
                                                control={
                                                        <Checkbox
                                                                checked={checkedItems.wikipedia}
                                                                onChange={handleCheckboxChange}
                                                                name="wikipedia"
                                                        />
                                                }
                                                label="WIKIPEDIA"
                                        />
                                </MenuItem>
                        </Menu>
                        <Menu
                                anchorEl={subMenuAnchorEl}
                                open={subMenuOpen}
                                onClose={handleSubMenuClose}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                                {selectedMenu && [
                                        <MenuItem key="tfidf">
                                                <FormControlLabel
                                                        control={
                                                                <Checkbox
                                                                        checked={subMenuCheckedItems.tfidf}
                                                                        onChange={handleSubMenuCheckboxChange}
                                                                        name="tfidf"
                                                                />
                                                        }
                                                        label="TF-IDF"
                                                />
                                        </MenuItem>,
                                        <MenuItem key="embedding">
                                                <FormControlLabel
                                                        control={
                                                                <Checkbox
                                                                        checked={subMenuCheckedItems.embedding}
                                                                        onChange={handleSubMenuCheckboxChange}
                                                                        name="embedding"
                                                                />
                                                        }
                                                        label="EMBEDDING"
                                                />
                                        </MenuItem>
                                ]}
                        </Menu>
                </div>
        );
};

export default MenuAppBar;
