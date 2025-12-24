"""
Two-Factor Authentication (2FA) Support
Implements TOTP (Time-based One-Time Password) for 2FA
"""

import pyotp
import qrcode
import io
import base64
from typing import Optional
from sqlalchemy import Column, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class TwoFactorAuth:
    """Two-Factor Authentication utilities"""
    
    @staticmethod
    def generate_secret() -> str:
        """Generate a new TOTP secret"""
        return pyotp.random_base32()
    
    @staticmethod
    def generate_totp_uri(secret: str, email: str, issuer: str = "MODELE") -> str:
        """Generate TOTP URI for QR code"""
        totp = pyotp.TOTP(secret)
        return totp.provisioning_uri(
            name=email,
            issuer_name=issuer,
        )
    
    @staticmethod
    def generate_qr_code(uri: str) -> str:
        """Generate QR code as base64 string"""
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(uri)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)
        
        return base64.b64encode(buffer.read()).decode()
    
    @staticmethod
    def verify_totp(secret: str, token: str, window: int = 1) -> bool:
        """Verify TOTP token"""
        totp = pyotp.TOTP(secret)
        return totp.verify(token, valid_window=window)
    
    @staticmethod
    def generate_backup_codes(count: int = 10) -> list[str]:
        """Generate backup codes for 2FA"""
        import secrets
        return [secrets.token_urlsafe(16) for _ in range(count)]


# Database model for 2FA (add to User model)
class TwoFactorModel:
    """2FA fields to add to User model"""
    two_factor_secret: Optional[str] = None  # TOTP secret
    two_factor_enabled: bool = False  # Whether 2FA is enabled
    two_factor_backup_codes: Optional[str] = None  # JSON array of backup codes
    two_factor_verified: bool = False  # Whether 2FA setup is verified

