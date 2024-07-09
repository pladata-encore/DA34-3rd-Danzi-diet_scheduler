# 🍠식단 관리를 통한 다이어트 스케줄러
### DATA ANALYST 34th Team.Danzi
Member : 허동우, 김유리, 류가연, 송대선, 정지윤
### Application name
![앱 로고 small](https://github.com/pladata-encore/DA34-3rd-Danzi-diet_scheduler/assets/80755116/e8172eb4-06eb-4e85-98ae-a8a0160a4e1a)
## 목차
- [프로젝트 소개](#1-프로젝트-소개)
- [팀원 소개](#2-팀원-소개)
- [개발 환경](#3-개발-환경)
- [모델 개발](#4-모델-개발)
- [기능 소개](#5-기능-소개)
- [설계 문서](#6-설계-문서)
- [기술 스택](#7-기술-스택)

## 1. 프로젝트 소개
다이어트 스케쥴러는 체계적인 식단 관리와 운동 기록을 통해 사용자가 건강하게 체중을 감량할 수 있도록 돕는 어플리케이션입니다. 이 앱은 사용자의 일일 칼로리 섭취량과 운동량을 기반으로 맞춤형 다이어트 계획을 제공하며, 딥러닝 모델을 활용한 식단 인식을 통해 더욱 정확한 데이터를 제공합니다.

### 1-1. 주요 기능
  - 식단 기록: 딥러닝 모델을 활용한 식단 사진 인식으로 음식명, 무게, 탄수화물, 단백질, 지방, 칼로리를 자동으로 기록합니다.
  - 칼로리 처방: 사용자의 키, 몸무게, 목표 체중, 활동량 등을 기반으로 일일 섭취 칼로리와 탄단지 비율을 계산하여 제공합니다.
  - D-day 기록: 사용자의 섭취 칼로리와 권장 칼로리 섭취량을 비교하여 다이어트 목표일을 조정해줍니다.
  - 통계 시각화: 일일 칼로리, 탄수화물, 단백질, 지방 섭취량을 그래프로 시각화하여 한눈에 확인할 수 있습니다.
### 1-2. 프로젝트 목표
  - 딥러닝 모델 정확도 95% 달성
  - 건강한 식단을 통한 효과적인 다이어트
### 1-3. 기대 효과
  - 체계적인 식단 및 운동 관리로 건강한 다이어트 실현
  - 맞춤형 칼로리 및 영양소 처방으로 체중 감량 목표 달성
  - 그래프를 통한 시각적 데이터 제공으로 동기 부여 및 목표 추적

## 2. 팀원 소개
![팀원소개](https://github.com/pladata-encore/DA34-3rd-Danzi-diet_scheduler/assets/80755116/70ff0075-8e49-4094-add6-ca4fe60bae45)

## 3. 개발 환경
### 3-1. React Native 개발 환경 구축
```javascript
"@miblanchard/react-native-slider": "^2.6.0",
"@react-native-async-storage/async-storage": "^1.23.1",
"@react-native-community/slider": "^4.5.2",
"@react-navigation/native": "^6.1.17",
"@react-navigation/native-stack": "^6.9.26",
"@react-navigation/stack": "^6.3.29",
"axios": "^1.7.2",
"d3-shape": "^3.2.0",
"expo": "~51.0.14",
"expo-file-system": "^17.0.1",
"expo-image-picker": "~15.0.5",
"expo-status-bar": "~1.12.1",
"react": "18.2.0",
"react-native": "0.74.2",
"react-native-calendar-strip": "^2.2.6",
"react-native-calendars": "^1.1305.0",
"react-native-paper": "^5.12.3",
"react-native-permissions": "^4.1.5",
"react-native-safe-area-context": "^4.10.5",
"react-native-screens": "^3.32.0",
"react-native-svg": "^15.3.0",
"react-native-svg-charts": "^5.4.0",
"styled-components": "^6.1.11"
```

### 3-2. Django 개발 환경 구축
```plaintext
absl-py==2.1.0
asgiref==3.8.1
asttokens==2.2.1
astunparse==1.6.3
backcall==0.2.0
boto3==1.34.131
botocore==1.34.131
cachetools==5.3.3
certifi==2024.6.2
charset-normalizer==3.3.2
colorama==0.4.6
comm==0.1.4
debugpy==1.6.7
decorator==5.1.1
Django==5.0.6
djangorestframework==3.15.1
djangorestframework-jwt==1.11.0
djangorestframework-simplejwt==5.3.1
executing==1.2.0
flatbuffers==24.3.25
gast==0.5.4
google-auth==2.30.0
google-auth-oauthlib==1.2.0
google-pasta==0.2.0
grpcio==1.64.1
h5py==3.11.0
idna==3.7
ipykernel==6.25.0
ipython==8.14.0
jedi==0.19.0
jmespath==1.0.1
jupyter_client==8.3.0
jupyter_core==5.3.1
keras==2.15.0
libclang==18.1.1
Markdown==3.6
MarkupSafe==2.1.5
matplotlib-inline==0.1.6
mysqlclient==2.2.4
ml-dtypes==0.2.0
nest-asyncio==1.5.7
numpy==1.26.4
oauthlib==3.2.2
opencv-python==4.10.0.84
opt-einsum==3.3.0
packaging==24.1
parso==0.8.3
pickleshare==0.7.5
platformdirs==3.10.0
prompt-toolkit==3.0.39
protobuf==4.25.3
psutil==5.9.5
pure-eval==0.2.2
pyasn1==0.6.0
pyasn1_modules==0.4.0
PyJWT==1.7.1
PyMySQL==1.1.1
python-dateutil==2.9.0.post0
pywin32==306 #리눅스 환경 설치시 제외
pyzmq==25.1.0
requests==2.32.3
requests-oauthlib==2.0.0
rsa==4.9
s3transfer==0.10.1
six==1.16.0
sqlparse==0.5.0
stack-data==0.6.2
tensorboard==2.15.2
tensorboard-data-server==0.7.2
tensorflow==2.15.0
tensorflow-estimator==2.15.0
tensorflow-intel==2.15.0 #리눅스 환경 설치시 제외
tensorflow-io-gcs-filesystem==0.31.0
termcolor==2.4.0
traitlets==5.9.0
typing_extensions==4.12.2
tzdata==2024.1
urllib3==2.2.2
wcwidth==0.2.6
Werkzeug==3.0.3
wrapt==1.14.1
```

### 3-3. EC2 인스턴스에서 프로젝트를 실행하기 위한 백엔드 개발 환경을 구축
### 1). EC2 인스턴스에 SSH 접속

#### (1). **Putty 설정**:
    - `.ppk` 파일을 사용하여 Putty를 통해 EC2 인스턴스에 접속합니다.
    - "login as:" 메시지가 나타나면 `ubuntu`를 입력합니다.

### 2). Git으로 프로젝트 클론

#### (1). **프로젝트 클론**:
    git clone https://github.com/pladata-encore/DA34-3rd-Danzi-diet_scheduler.git
    cd diet2

### 3). 가상환경 설정 및 패키지 설치

#### (1). **가상환경 설정**:
    sudo apt-get update
    sudo apt-get install software-properties-common
    sudo add-apt-repository ppa:deadsnakes/ppa
    sudo apt-get update
    sudo apt-get install python3.10 python3.10-venv python3.10-dev
    python3.10 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip setuptools


#### (2). **필요한 패키지 설치**:
    sudo apt-get update
    sudo apt-get install pkg-config
    sudo apt-get install build-essential libmysqlclient-dev
    sudo apt-get install libgl1
    pip install --upgrade pip setuptools wheel
    pip install mysqlclient pandas
    pip install -r requirements.txt

    
#### (3). **방화벽 설정**:
    sudo ufw allow 8000/tcp
    sudo ufw enable
    sudo ufw status

## 4. 모델 개발
### 4-1. 객체 탐지 모델
  - YoloV3를 기반으로 모델 학습
  - 아래의 학습 History 참고
    
![객체 탐지 history)](https://github.com/pladata-encore/DA34-3rd-Danzi-diet_scheduler/assets/80755116/ca6dea84-9ace-44d1-b978-de9a016ef665)


### 4-2. 음식 분류 모델
  - ResNet152V2를 기반으로 모델 학습
  - 100여가지의 음식 메뉴를 학습

![음식 분류 모델 구조](https://github.com/pladata-encore/DA34-3rd-Danzi-diet_scheduler/assets/80755116/ade03c17-19da-4944-83e1-6c3457aa9fd5)

### 4-3. 음식량 추정 모델
  - ResNet152V2를 기반으로 모델 학습
    
![음식량 추정 모델 구조](https://github.com/pladata-encore/DA34-3rd-Danzi-diet_scheduler/assets/80755116/6c9b633d-781e-4e1a-950a-b2a5a3d374cd)
    
## 5. 기능 소개
### 5-1. 회원가입 및 로그인
![로그인및회원가입](https://github.com/pladata-encore/DA34-3rd-Danzi-diet_scheduler/assets/80755116/b50ffff7-0003-4a60-9f4f-e60cb64e5bf2)

### 5-2. 식단 입력 및 캘린더 화면
![식단입력캘린더](https://github.com/pladata-encore/DA34-3rd-Danzi-diet_scheduler/assets/80755116/255bda45-2e02-4e85-a710-0ee4457eda59)

### 5-3. 식단 정보 수정 및 삭제
![식단수정및삭제](https://github.com/pladata-encore/DA34-3rd-Danzi-diet_scheduler/assets/80755116/3bdfb11d-53ed-41ff-9944-58a7cb902fea)

### 5-4. 인사이트 및 회원정보 관리
![인사이트및정보수정및로그아웃](https://github.com/pladata-encore/DA34-3rd-Danzi-diet_scheduler/assets/80755116/508a459c-a092-4b75-8249-8cd1521aadcc)

## 6. 설계 문서
### 6-1. System Architecture
![시스템 아키텍쳐](https://github.com/pladata-encore/DA34-3rd-Danzi-diet_scheduler/assets/80755116/675f75fd-1682-4e1a-936d-d58f1685593d)
### 6-1. Wire Frame
![와이어프레임](https://github.com/pladata-encore/DA34-3rd-Danzi-diet_scheduler/assets/80755116/d7b2dbe4-edf9-4669-b59a-2c1765d15023)
### 6-1. ERD
![ERD](https://github.com/pladata-encore/DA34-3rd-Danzi-diet_scheduler/assets/80755116/46a2bdf8-c23e-44e2-a896-7ccda9c9afa2)

## 7. 기술 스택
### 협업 도구
<p align="center">
    <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"/>
    <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>
    <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/>
    <img src="https://img.shields.io/badge/gitkraken-179287?style=for-the-badge&logo=gitkraken&logoColor=white"/>
    <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/>
</p>

### 개발 언어 및 프레임워크
<p align="center">
    <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
    <img src="https://img.shields.io/badge/react_native-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
    <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
    <img src="https://img.shields.io/badge/jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white"/>
    <img src="https://img.shields.io/badge/colab-F9AB00?style=for-the-badge&logo=googlecolab&logoColor=white"/>
    <img src="https://img.shields.io/badge/numpy-013243?style=for-the-badge&logo=numpy&logoColor=white"/>
    <img src="https://img.shields.io/badge/keras-D00000?style=for-the-badge&logo=keras&logoColor=white"/>
    <img src="https://img.shields.io/badge/tensorflow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white"/>
    <img src="https://img.shields.io/badge/opencv-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white"/>
    <img src="https://img.shields.io/badge/yolo-00FFFF?style=for-the-badge&logo=yolo&logoColor=black"/>
    <img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white"/>
    <img src="https://img.shields.io/badge/restapi-005571?style=for-the-badge&logo=api&logoColor=white"/>
    <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
    <img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"/>
    <img src="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black"/>
    <img src="https://img.shields.io/badge/vs_code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/>
    <img src="https://img.shields.io/badge/google_drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white"/>
    <img src="https://img.shields.io/badge/android-34A853?style=for-the-badge&logo=android&logoColor=white"/>
</p>
