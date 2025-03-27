import { Request, Response ,NextFunction} from 'express';
import { BusinessModel } from '../models/business';
import { BusinessCategoryFactory } from '../factory/BusinessCategoryFactory';
import { BusinessCategoryStrategy } from '../interfaces/businessCategoryStrategy';

export const getUserServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId;
  
      // ดึง businesses ของ user
      const businesses = await BusinessModel.find({ userId });
  
      const allServices: any[] = [];
  
      for (const business of businesses) {
        const strategy = BusinessCategoryFactory.createCategory(
          business.category,
          business._id.toString()
        );
  
        if (strategy && strategy.getServices) {
          const services = await strategy.getServices();
          allServices.push(
            ...services.map(s => ({
              ...s.toObject?.() || s,
              category: business.category,
              businessId: business._id,
            }))
          );
        }
      }
  
      res.json(allServices); // ✅ ไม่ต้อง return res
    } catch (err) {
      console.error('Error getting user services:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
