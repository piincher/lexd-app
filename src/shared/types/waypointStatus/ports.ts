/**
 * Port-Specific Waypoint Status System - Port categories
 */

import { LocationCategory } from './core';

export const PORT_CATEGORIES: Record<string, LocationCategory> = {
  'CNNAN': 'LOADING_PORT',
  'CNSHA': 'LOADING_PORT',
  'CNNSA': 'LOADING_PORT',
  
  'SGSIN': 'TRANSIT_PORT',
  'GHTEM': 'TRANSIT_PORT',
  'MYPKG': 'TRANSIT_PORT',
  
  'SNDKR': 'DISCHARGE_PORT',
  'CIABJ': 'DISCHARGE_PORT',
  'TGLFW': 'DISCHARGE_PORT',
  'NGLOS': 'DISCHARGE_PORT',
  
  'SNML': 'BORDER',
  'SN_ML_BDR': 'BORDER',
  'DBL': 'BORDER',
  'DIBOLI': 'BORDER',
  
  'SN_DKR_CUS': 'CUSTOMS',
  'ML_DIB_CUS': 'CUSTOMS',
  
  'MLBKQ': 'WAREHOUSE',
  'MLBKO': 'WAREHOUSE',
  'BKO': 'WAREHOUSE',
};

export const getLocationCategory = (locationCode: string): LocationCategory => {
  const upperCode = locationCode.toUpperCase();
  return PORT_CATEGORIES[upperCode] || 'ROAD_TRANSIT';
};
