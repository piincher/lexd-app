/**
 * GoodsDimensionsInput - Form section for CBM calculation
 * Thin composition wrapper — sub-components handle rendering
 */

import React from 'react';
import { Card } from "react-native-paper";
import { GoodsDimensionsInputProps } from "../types";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { AirShippingView } from "./GoodsDimensionsInput/AirShippingView";
import { DimensionsToggle } from "./GoodsDimensionsInput/DimensionsToggle";
import { DimensionsInputs } from "./GoodsDimensionsInput/DimensionsInputs";
import { DirectCBMInput } from "./GoodsDimensionsInput/DirectCBMInput";
import { createStyles } from "./GoodsDimensionsInput.styles";

export const GoodsDimensionsInput: React.FC<GoodsDimensionsInputProps> = ({
   control,
   errors,
   useDimensions = false,
   onToggleMode,
   calculatedCBM,
   shippingMode,
}) => {
   const { colors } = useAppTheme();
   const styles = createStyles(colors);
   const isAirShipping = shippingMode === "AIR";

   return (
      <Card style={styles.card} elevation={2}>
         <Card.Content style={styles.cardContent}>
            {isAirShipping ? (
               <AirShippingView control={control} errors={errors} />
            ) : (
               <>
                  <DimensionsToggle useDimensions={useDimensions} onToggleMode={onToggleMode} />
                  {useDimensions ? (
                     <DimensionsInputs
                        control={control}
                        errors={errors}
                        calculatedCBM={calculatedCBM}
                     />
                  ) : (
                     <DirectCBMInput control={control} errors={errors} />
                  )}
               </>
            )}
         </Card.Content>
      </Card>
   );
};

export default GoodsDimensionsInput;
